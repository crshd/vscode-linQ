"use strict";

import * as vscode from "vscode";

import { parse } from "node-html-parser";

let links: vscode.QuickPickItem[] = [];

// Parse sitemap.xml
function parseSitemap(file: string) {
  vscode.workspace.openTextDocument(file).then(html => {
    const dom = parse(html.getText());
    const map: any[] = dom.querySelectorAll(".sitemap-site a"); // Stupid Typescript... Type Node *does* have attributes
    const base: string = map[0].attributes.href;

    // clean old sitemap
    links = [];

    map.forEach((link: any) => {
      let linkUrl: string =
        link.attributes.href === base
          ? link.attributes.href
          : base + link.attributes.href;
      links.push({
        label: link.text,
        detail: linkUrl
      });
    });
  });
}

// Insert link
function insertLink() {
  let editor = vscode.window.activeTextEditor;

  if (links.length < 0) {
    registerSitemap();
  }

  vscode.window.showQuickPick(links).then(pick => {
    if (!pick || editor === undefined) {
      return;
    }

    editor.edit(edit => {
      if (editor !== undefined) {
        editor.selections.forEach(selection => {
          /* I'm fucking sure it's not undefined by now */
          if (editor !== undefined) {
            edit.delete(selection);
            edit.insert(
              selection.start,
              `<a href="${pick.detail}" title="Gehe zu: ${pick.label}">
              ${editor.document.getText(selection)}
              </a>`
            );
          }
        });
      }
    });
  });
}

function registerSitemap() {
  const options: vscode.OpenDialogOptions = {
    canSelectMany: false,
    openLabel: "Open Sitemap HTML",
    filters: {
      "Text files": ["html"]
    }
  };

  vscode.window.showOpenDialog(options).then(value => {
    if (value !== null && value !== undefined) {
      parseSitemap(value[0].fsPath);
    }
  });
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  vscode.commands.registerCommand("extension.registerSitemap", registerSitemap);
  vscode.commands.registerCommand("extension.insertLink", insertLink);
}

// this method is called when your extension is deactivated
export function deactivate() {}

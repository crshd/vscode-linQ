"use strict";

import * as vscode from "vscode";

import { parse } from "node-html-parser";

let links: vscode.QuickPickItem[] = [];

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

// Parse sitemap.xml
function parseSitemap(file: string) {
  vscode.workspace.openTextDocument(file).then(html => {
    const dom = parse(html.getText());
    const map: any[] = dom.querySelectorAll(".sitemap-site a"); // Stupid Typescript... Type Node *does* have attributes
    const base: string = (map[0].attributes.href === '/home.aspx' || map[0].attributes.href.indexOf('scripts/show.aspx') >=0) ? 'http:' : map[0].attributes.href;
    console.log(map[0].attributes.href);
    console.log(map[1].attributes.href);
    
    // clean old sitemap
    links = [];

    map.forEach((link: any) => {
      let linkUrl: string =
        link.attributes.href === base
          ? link.attributes.href
          : base + link.attributes.href.replace('..','');
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
  let label: string;

  if (links.length === 0) {
    registerSitemap();
  }

  vscode.window.showQuickPick(links).then(pick => {
    if (!pick || editor === undefined) {
      return;
    }

    if (pick.detail !== undefined && pick.detail.indexOf('gw_') >= 0) {
      label = links.find((l: any) => l.detail.indexOf('gw_') >= 0)['label'];
    } else {
      label = pick.label;
    }

    editor.edit(edit => {
      if (editor !== undefined) {
        editor.selections.forEach(selection => {
          /* I'm fucking sure it's not undefined by now */
          if (editor !== undefined) {
            edit.delete(selection);
            edit.insert(
              selection.start,
              `<a href="${pick.detail}" title="Gehe zu: ${label}">` +
                editor.document.getText(selection) +
                "</a>"
            );
          }
        });
      }
    });
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

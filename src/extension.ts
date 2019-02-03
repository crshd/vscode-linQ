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
    const base: string = getUrlBase(map[0].attributes.href)();

    // clean old sitemap
    links = [];

    map.forEach((link: any) => {
      links.push({
        label: link.text,
        detail: buildLink(base, getUrlPath(link.attributes.href))
      });
    });
  });
}

function buildLink(base: string, path: string) {
  let link: string = '';

  switch (path) {
    case "":
      link = base; break;
  
    case "home.aspx":
      link = "http:/home.aspx"; break;

    case "scripts/hrskalender.aspx":
      link = "http:/scripts/hrskalender.aspx"; break;

    default:
      base = (base.indexOf('home.aspx') >= -1) ? 'http:/scripts/show.aspx?content=' : base.replace(/\/$/, '');
      path = path.replace(/^\//, '');
      link = (base + "/" + path); break;
  }

  return link.replace(/\/\.\//, '/'); // Fix stuff for a certain someone
}

function getUrlPath(href: string) {
  return href
    .replace("/scripts/show.aspx?content=", "")
    .replace(/^\.+\/?/, "")
    .replace(/https?:\/\/.*?\//, "");
}

function getUrlBase(map: string) {
  return function() {
    if (
      map === "/home.aspx" ||
      map.indexOf("scripts/show.aspx") >= 0 ||
      map.indexOf("..") >= 0
    ) {
      return "http:/scripts/show.aspx?content=";
    } else {
      return map;
    }
  };
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

    if (pick.detail !== undefined && pick.detail.indexOf("gw_") >= 0) {
      label = links.find((l: any) => l.detail.indexOf("gw_") >= 0)["label"];
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

            // remove annotation
            let start: vscode.Position = selection.end;
            let end: vscode.Position = editor.document.lineAt(start.line).range
              .end;
            let range: vscode.Range = new vscode.Range(start, end);
            let replacedText: string = editor.document
              .getText(range)
              .replace(/\s*\[.*?\]\s*/, " ");
            edit.replace(range, replacedText);
          }
        });
      }
    });
  });
}

// Replace link URL
function replaceLink() {
  let editor = vscode.window.activeTextEditor;
  let label: string;

  vscode.window.showQuickPick(links).then(pick => {
    if (!pick || editor === undefined) {
      return;
    }

    if (pick.detail !== undefined && pick.detail.indexOf("gw_") >= 0) {
      label = links.find((l: any) => l.detail.indexOf("gw_") >= 0)["label"];
    } else {
      label = pick.label;
    }

    editor.edit(edit => {
      if (editor !== undefined) {
        editor.selections.forEach(selection => {
          let start: vscode.Position = editor.document.lineAt(selection.start.line).range.start;
          let end: vscode.Position = selection.start;
          let range: vscode.Range = new vscode.Range(start, end);
          let replacedText: string = editor.document
            .getText(range)
            .replace(/(http:[^"]+)(((?!http).)*)$/, `${pick.detail}$2`)
            .replace(/(Gehe zu:[^"]+)(((?!Gehe zu:).)*)$/, `Gehe zu: ${label}$2`);
          edit.replace(range, replacedText);
        });
      }
    });
  });
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  vscode.commands.registerCommand("linq.registerSitemap", registerSitemap);
  vscode.commands.registerCommand("linq.insertLink", insertLink);
  vscode.commands.registerCommand("linq.replaceLink", replaceLink);
}

// this method is called when your extension is deactivated
export function deactivate() {}

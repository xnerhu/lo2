import { Text, Node } from 'slate';
import escapeHtml from 'escape-html';

import { IEditorSelectionFormat } from '~/interfaces';

class SerializerService {
  public serializeNode(node: Node) {
    if (Text.isText(node)) {
      return this.serializeTextNode(node);
    }

    return this.serializeBlockNode(node);
  }

  private serializeTextNode(node: Node) {
    const text = escapeHtml(node.text);
    const className = node['color-highlight']
      ? ` class="article-color-highlight"`
      : '';

    let html = `<span${className}>${text}</span>`;

    if (node.bold) html = `<b>${html}</b>`;
    if (node.italic) html = `<em>${html}</em>`;
    if (node.underline) html = `<u>${html}</u>`;
    if (node.code) html = `<code>${html}</code>`;

    return html;
  }

  private serializeBlockNode(node: Node) {
    const children = this.serializeToHtml(node.children);

    switch (node.type as IEditorSelectionFormat) {
      case 'align-center':
        return `<p class="align-center">${children}</p>`;
      case 'align-right':
        return `<p class="align-right">${children}</p>`;
      case 'list-item':
        return `<li>${children}</li>`;
      case 'list-numbered':
        return `<ol>${children}</ol>`;
      case 'list-bulleted':
        return `<ul>${children}</ul>`;
      case 'block-quote':
        return `<blockquote>${children}</blockquote>`;
      case 'h4':
        return `<h4>${children}</h4>`;
      case 'link':
        return `<a class="article-link" href=${escapeHtml(
          node.url,
        )}>${children}</a>`;
      case 'image':
        return `
          <div class="article-image-wrapper">
            <div>
              <img class="article-image" src=${escapeHtml(node.url)} />
            </div>
            ${children}
          </div>
        `;
      default:
        return `<p>${children}</p>`;
    }
  }

  public serializeToHtml(nodes: Node[]): string {
    return nodes.map((r) => this.serializeNode(r)).join('');
  }
}

export default new SerializerService();

import './markdown.css';
import fs from 'fs';
import path from 'path';
import { renderMarkdownToHTML } from '@/lib/markdown';

async function createInnerHtmlForMarkdown(filePath: string):Promise< { __html: string } >{
  const renderedHTML = await renderMarkdownToHTML(filePath);
  return { __html: renderedHTML };
}

export default async function MarkdownPreview(props: Readonly<{ filename: string }>) {
  let markup = await createInnerHtmlForMarkdown(props.filename);
  return (
    <div className="MarkDown" dangerouslySetInnerHTML={markup} />
  );
};
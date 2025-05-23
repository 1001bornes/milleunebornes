import './markdown.css';
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
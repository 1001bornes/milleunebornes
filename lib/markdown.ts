import fs from 'fs';
import path from 'path';
import { remark } from 'remark'; 
import html from 'remark-html';
import rehype from "remark-rehype" 
import rehypeRaw from 'rehype-raw';  // Import rehype-raw for HTML processing 
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';  // For sanitization 
import stringify from "rehype-stringify"

function getMarkdownData(filePath: string): string {
  const fullPath = path.join(process.cwd(), ''+ filePath);
  let fileContent = fs.readFileSync(fullPath, 'utf8');
  return fileContent;
}

// Customize the sanitize schema to allow the "style" attribute 
  const customSchema = { 
    ...defaultSchema, 
    tagNames: [...(defaultSchema.tagNames || []), "img", "div"], // Allow img and div tags 
    attributes: { 
      ...defaultSchema.attributes, 
      img: ["src", "alt", "width", "height", "style"], // Allow img attributes 
      div: ["style"], // Allow div attributes 
    }, 
  }

export async function renderMarkdownToHTML(filePath: string): Promise<string> {
  const fileContents = getMarkdownData(filePath);
  const processedContent = await remark() 
    .use(html) 
    .use(rehype, { allowDangerousHtml: true }) // Convert markdown to HTML-compatible tree 
    .use(rehypeRaw) // Process raw HTML elements like <img> 
    .use(rehypeSanitize, customSchema) // Sanitize the HTML to prevent XSS attacks 
    .use(stringify) // Convert the rehype tree into HTML
    .process(fileContents);

  return processedContent.toString(); 
}
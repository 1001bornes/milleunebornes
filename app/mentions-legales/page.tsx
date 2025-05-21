
import MarkdownPreview from "@/components/ui/markdown-preview";

export default async function MentionsLegales() {
    return (
        <main>
            <MarkdownPreview filename="public/mentions-legales.md" />
        </main>
    );
};

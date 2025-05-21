import * as React from "react";
import { Tabs } from "radix-ui";
import MarkdownPreview from "@/components/ui/markdown-preview";

export default async function WhoAreWe() {
    return (
        <main>
            <Tabs.Root defaultValue="association" orientation="vertical">
                <Tabs.List aria-label="Qui sommes nous" className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
                    <Tabs.Trigger className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                        value="association">L'association</Tabs.Trigger>
                    <Tabs.Trigger className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                        value="bureau-CA">Bureau et CA</Tabs.Trigger>
                    <Tabs.Trigger className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                            value="statuts">Les statuts</Tabs.Trigger>
                    <Tabs.Trigger className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                            value="assemblees-generales">Assemblées générales</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value="association">
                    <MarkdownPreview filename="public/qui-sommes-nous/association.md" />
                </Tabs.Content>
                <Tabs.Content  className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value="bureau-CA">
                        Tab two content
                    </Tabs.Content>
                <Tabs.Content  className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value="statuts">
                    <MarkdownPreview filename="public/qui-sommes-nous/statuts.md" />
                </Tabs.Content>
                <Tabs.Content  className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value="assemblees-generales">
                    <MarkdownPreview filename="public/qui-sommes-nous/assemblees-generales.md" />
                </Tabs.Content>
            </Tabs.Root>
        </main>
    );
};

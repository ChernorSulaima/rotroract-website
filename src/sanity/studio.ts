import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./schemas"
import { sanityConfig } from "./config"

export default defineConfig({
    name: "rotaract-freetown-sunset",
    title: "Rotaract Club of Freetown Sunset",

    projectId: sanityConfig.projectId,
    dataset: sanityConfig.dataset,
    basePath: "/studio",

    plugins: [
        structureTool({
            structure: (S) =>
                S.list()
                    .title("Content")
                    .items([
                        // Site Settings singleton
                        S.listItem()
                            .title("Site Settings")
                            .child(
                                S.document()
                                    .schemaType("siteSettings")
                                    .documentId("siteSettings")
                            ),
                        S.divider(),
                        // Homepage
                        S.listItem()
                            .title("Homepage")
                            .child(
                                S.list()
                                    .title("Homepage Content")
                                    .items([
                                        S.listItem()
                                            .title("Hero Slides")
                                            .child(
                                                S.documentTypeList("heroSlide").title("Hero Slides")
                                            ),
                                        S.listItem()
                                            .title("Impact Stats")
                                            .child(
                                                S.documentTypeList("impactStat").title("Impact Stats")
                                            ),
                                        S.listItem()
                                            .title("Focus Areas")
                                            .child(
                                                S.documentTypeList("focusArea").title("Focus Areas")
                                            ),
                                    ])
                            ),
                        S.divider(),
                        // Other content types
                        S.documentTypeListItem("event").title("Events"),
                        S.documentTypeListItem("galleryImage").title("Gallery"),
                        S.documentTypeListItem("teamMember").title("Team Members"),
                        S.documentTypeListItem("faq").title("FAQs"),
                    ]),
        }),
        visionTool(),
    ],

    schema: {
        types: schemaTypes,
    },
})

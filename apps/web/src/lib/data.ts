// Example documents data array with realistic content
const documentsData = [
  {
    id: "doc_123e4567-e89b-12d3-a456-426614174000",
    title: "My First Novel - The Digital Frontier",
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 1 },
          content: [{ type: "text", text: "Chapter 1: The Beginning" }],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "It was a dark and stormy night when " },
            { type: "text", marks: [{ type: "italic" }], text: "Sarah" },
            {
              type: "text",
              text: " first discovered the mysterious code that would change everything...",
            },
          ],
        },
      ],
    },
    documentType: "document" as const,
    userId: "user_550e8400-e29b-41d4-a716-446655440000",
    isAnonymous: false,
    isPublic: false,
    wordCount: 1247,
    lastEditedBy: "user_550e8400-e29b-41d4-a716-446655440000",
    createdAt: new Date("2024-08-15T09:30:00Z"),
    updatedAt: new Date("2024-08-30T14:22:00Z"),
    deletedAt: null,
  },
  {
    id: "doc_987fcdeb-51f2-43c1-b234-567890abcdef",
    title: "Meeting Notes - Q3 Planning",
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Q3 2024 Planning Meeting" }],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", marks: [{ type: "bold" }], text: "Date: " },
            { type: "text", text: "August 28, 2024" },
          ],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Launch new product features by September 15",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Hire 2 new developers for the frontend team",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    documentType: "note" as const,
    userId: "user_550e8400-e29b-41d4-a716-446655440000",
    isAnonymous: false,
    isPublic: false,
    wordCount: 45,
    lastEditedBy: "user_667e8400-e29b-41d4-a716-446655440001",
    createdAt: new Date("2024-08-28T10:15:00Z"),
    updatedAt: new Date("2024-08-28T11:30:00Z"),
    deletedAt: null,
  },
  {
    id: "doc_456789ab-cdef-1234-5678-90abcdef1234",
    title: "Blog Post Template",
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 1 },
          content: [{ type: "text", text: "[Blog Post Title]" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              marks: [{ type: "italic" }],
              text: "Introduction paragraph - Hook the reader with an interesting opening...",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Main Point 1" }],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Explain your first main point here..." },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Main Point 2" }],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Explain your second main point here..." },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Conclusion" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Summarize key points and provide a call to action...",
            },
          ],
        },
      ],
    },
    documentType: "template" as const,
    userId: "user_550e8400-e29b-41d4-a716-446655440000",
    isAnonymous: false,
    isPublic: true,
    wordCount: 28,
    lastEditedBy: "user_550e8400-e29b-41d4-a716-446655440000",
    createdAt: new Date("2024-08-20T16:45:00Z"),
    updatedAt: new Date("2024-08-20T16:45:00Z"),
    deletedAt: null,
  },
  {
    id: "doc_anonymous_12345",
    title: "Quick Thoughts",
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Just some random thoughts I'm jotting down. Need to remember to:",
            },
          ],
        },
        {
          type: "orderedList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Call mom this weekend" }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Finish reading that book about productivity",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    { type: "text", text: "Research " },
                    {
                      type: "text",
                      marks: [{ type: "code" }],
                      text: "TanStack Start",
                    },
                    { type: "text", text: " for the new project" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    documentType: "note" as const,
    userId: "anonymous_user_temp",
    isAnonymous: true,
    isPublic: false,
    wordCount: 23,
    lastEditedBy: null,
    createdAt: new Date("2024-08-30T12:00:00Z"),
    updatedAt: new Date("2024-08-30T12:05:00Z"),
    deletedAt: null,
  },
  {
    id: "doc_collaborative_456",
    title: "Team Project Documentation",
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 1 },
          content: [{ type: "text", text: "Project Overview" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "This document outlines our approach to building the new writing application. ",
            },
            {
              type: "text",
              marks: [{ type: "bold" }],
              text: "Key stakeholders should review by Friday.",
            },
          ],
        },
        {
          type: "blockquote",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [{ type: "italic" }],
                  text: '"The best writing apps feel invisible - they get out of your way and let creativity flow."',
                },
                { type: "text", text: " - Design Philosophy" },
              ],
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Technical Requirements" }],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "We'll be using a modern stack including " },
            { type: "text", marks: [{ type: "code" }], text: "TanStack Start" },
            { type: "text", text: ", " },
            { type: "text", marks: [{ type: "code" }], text: "Hono.js" },
            { type: "text", text: ", and " },
            { type: "text", marks: [{ type: "code" }], text: "tRPC" },
            {
              type: "text",
              text: " for type safety across the entire application.",
            },
          ],
        },
      ],
    },
    documentType: "document" as const,
    userId: "user_667e8400-e29b-41d4-a716-446655440001",
    isAnonymous: false,
    isPublic: false,
    wordCount: 89,
    lastEditedBy: "user_778e8400-e29b-41d4-a716-446655440002",
    createdAt: new Date("2024-08-25T08:00:00Z"),
    updatedAt: new Date("2024-08-29T15:30:00Z"),
    deletedAt: null,
  },
  {
    id: "doc_deleted_example",
    title: "Old Draft - Deleted",
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "This document was deleted but kept for audit purposes.",
            },
          ],
        },
      ],
    },
    documentType: "document" as const,
    userId: "user_550e8400-e29b-41d4-a716-446655440000",
    isAnonymous: false,
    isPublic: false,
    wordCount: 12,
    lastEditedBy: "user_550e8400-e29b-41d4-a716-446655440000",
    createdAt: new Date("2024-08-10T14:20:00Z"),
    updatedAt: new Date("2024-08-12T09:15:00Z"),
    deletedAt: new Date("2024-08-12T09:15:00Z"),
  },
];

// Example with chapters (this would come from joining documents with chapters)
const documentWithChapters = {
  id: "doc_123e4567-e89b-12d3-a456-426614174000",
  title: "My First Novel - The Digital Frontier",
  documentType: "document" as const,
  userId: "user_550e8400-e29b-41d4-a716-446655440000",
  isAnonymous: false,
  isPublic: false,
  wordCount: 5420,
  lastEditedBy: "user_550e8400-e29b-41d4-a716-446655440000",
  createdAt: new Date("2024-08-15T09:30:00Z"),
  updatedAt: new Date("2024-08-30T14:22:00Z"),
  deletedAt: null,
  chapters: [
    {
      id: "chapter_001",
      documentId: "doc_123e4567-e89b-12d3-a456-426614174000",
      title: "Chapter 1: The Discovery",
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Sarah stared at the glowing screen, her coffee growing cold as lines of mysterious code scrolled past. Something about this pattern seemed ",
              },
              { type: "text", marks: [{ type: "italic" }], text: "familiar" },
              {
                type: "text",
                text: ", yet completely alien at the same time.",
              },
            ],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "The timestamp showed 3:47 AM. She'd been at this for hours, chasing digital breadcrumbs through the vast network that connected every device on the planet.",
              },
            ],
          },
        ],
      },
      orderIndex: 0,
      wordCount: 67,
      createdAt: new Date("2024-08-15T09:30:00Z"),
      updatedAt: new Date("2024-08-28T20:15:00Z"),
    },
    {
      id: "chapter_002",
      documentId: "doc_123e4567-e89b-12d3-a456-426614174000",
      title: "Chapter 2: The Connection",
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "The next morning brought clarity, but not the kind Sarah had hoped for. The code wasn't just random data—it was a ",
              },
              { type: "text", marks: [{ type: "bold" }], text: "message" },
              { type: "text", text: "." },
            ],
          },
          {
            type: "blockquote",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    marks: [{ type: "italic" }],
                    text: "\"Every system has a backdoor. The question isn't whether you can find it—it's whether you're brave enough to walk through.\"",
                  },
                ],
              },
            ],
          },
        ],
      },
      orderIndex: 1,
      wordCount: 45,
      createdAt: new Date("2024-08-16T10:00:00Z"),
      updatedAt: new Date("2024-08-29T16:30:00Z"),
    },
    {
      id: "chapter_003",
      documentId: "doc_123e4567-e89b-12d3-a456-426614174000",
      title: "Chapter 3: [Work in Progress]",
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                marks: [{ type: "italic" }],
                text: "[This chapter is still being written...]",
              },
            ],
          },
          {
            type: "paragraph",
            content: [{ type: "text", text: "Notes:" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "Sarah meets the mysterious contact",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "Reveal the true nature of the digital frontier",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Cliffhanger ending" }],
                  },
                ],
              },
            ],
          },
        ],
      },
      orderIndex: 2,
      wordCount: 25,
      createdAt: new Date("2024-08-20T14:00:00Z"),
      updatedAt: new Date("2024-08-30T14:22:00Z"),
    },
  ],
};

const mixedDocumentsData = [
  // Simple note
  {
    id: "note_quick_001",
    title: "Grocery List",
    content: {
      type: "doc",
      content: [
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    { type: "text", marks: [{ type: "strike" }], text: "Milk" },
                    { type: "text", text: " ✓" },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Bread" }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Eggs" }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    { type: "text", text: "Coffee (" },
                    {
                      type: "text",
                      marks: [{ type: "bold" }],
                      text: "important!",
                    },
                    { type: "text", text: ")" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    documentType: "note" as const,
    userId: "user_550e8400-e29b-41d4-a716-446655440000",
    isAnonymous: false,
    isPublic: false,
    wordCount: 6,
    lastEditedBy: "user_550e8400-e29b-41d4-a716-446655440000",
    createdAt: new Date("2024-08-30T08:00:00Z"),
    updatedAt: new Date("2024-08-30T08:15:00Z"),
    deletedAt: null,
  },

  // Research document
  {
    id: "doc_research_001",
    title: "AI Ethics Research Paper",
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 1 },
          content: [
            {
              type: "text",
              text: "The Ethical Implications of AI in Creative Writing",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Abstract" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "This paper examines the growing intersection of artificial intelligence and creative writing processes, with particular attention to questions of authorship, authenticity, and the future role of human creativity in an AI-augmented world.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "1. Introduction" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "The rapid advancement of large language models has created unprecedented opportunities and challenges for writers. As AI systems become increasingly sophisticated at generating human-like text...",
            },
          ],
        },
      ],
    },
    documentType: "document" as const,
    userId: "user_academic_researcher",
    isAnonymous: false,
    isPublic: true,
    wordCount: 2840,
    lastEditedBy: "user_academic_researcher",
    createdAt: new Date("2024-07-01T10:00:00Z"),
    updatedAt: new Date("2024-08-25T16:45:00Z"),
    deletedAt: null,
  },

  // Anonymous localStorage document
  {
    id: "local_temp_98765",
    title: "Weekend Project Ideas",
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Things to Build This Weekend" }],
        },
        {
          type: "orderedList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    { type: "text", text: "That writing app with " },
                    {
                      type: "text",
                      marks: [{ type: "code" }],
                      text: "TanStack Start",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Learn more about Drizzle ORM relations",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Maybe a simple game using Three.js?",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", marks: [{ type: "bold" }], text: "Priority: " },
            {
              type: "text",
              text: "Start with the writing app - it has the most potential for long-term use.",
            },
          ],
        },
      ],
    },
    documentType: "note" as const,
    userId: "localStorage_temp_user",
    isAnonymous: true,
    isPublic: false,
    wordCount: 38,
    lastEditedBy: null,
    createdAt: new Date("2024-08-30T14:30:00Z"),
    updatedAt: new Date("2024-08-30T14:35:00Z"),
    deletedAt: null,
  },
];

// TypeScript type for document data (matches Drizzle schema)
type DocumentData = {
  id: string;
  title: string;
  content: {
    type: string;
    content: Array<{
      type: string;
      attrs?: Record<string, any>;
      marks?: Array<{ type: string; attrs?: Record<string, any> }>;
      content?: Array<any>;
    }>;
  };
  documentType: "note" | "document" | "template";
  userId: string;
  isAnonymous: boolean;
  isPublic: boolean;
  wordCount: number;
  lastEditedBy: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export {
  documentsData,
  documentWithChapters,
  mixedDocumentsData,
  type DocumentData,
};

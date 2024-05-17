export const INPUT_TYPES = [
  { name: "Text", value: "text" },
  { name: "Number", value: "number" },
  { name: "Email", value: "email" },
  { name: "Date", value: "date" },
  { name: "Time", value: "time" },
  { name: "Long Text", value: "textarea" },
  { name: "Boolean", value: "boolean" },

  { name: "Select", value: "select" },
  { name: "Multiple Choice", value: "checkbox" },
  { name: "Radio", value: "radio" },
  
  { name: "Image", value: "image" },
  { name: "Files", value: "file" },
];

export const TEXT_FIELDS = [
  "text",
  "number",
  "email",
  "date",
  "time",
  "textarea",
  "boolean",

  "radio",
  "select",
]

export const SELECTION_FIELDS = [
  "checkbox",
];

export const FILE_FIELDS = [
  "image",
  "file"
]

export const DEFAULT_EXCLUDED_FIELDS = [
  ...FILE_FIELDS,
  "radio",
  "select",
  "checkbox",
];

export const PLACEHOLDER_EXCLUDED_FIELDS = [
  "date",
  "time",
  "boolean",
  "radio",
  "select",
  ...SELECTION_FIELDS,
  ...DEFAULT_EXCLUDED_FIELDS,
];

export const BOOLEAN_OPTIONS = [
  { name: "True", value: "true" },
  { name: "False", value: "false" }
];
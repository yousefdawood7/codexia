import { FolderStructure } from "@/features/editor/constants";
import { useRenderFileStructure } from "@/features/editor/hooks/useRenderFileStructure";

// This Dummy Local Data
const files: FolderStructure[] = [
  { name: "package.json", type: "file" },
  { name: "tsconfig.json", type: "file" },
  { name: ".env.local", type: "file" },
  { name: "next.config.js", type: "file" },
  {
    name: "src",
    type: "folder",
    children: [
      { name: "index.ts", type: "file" },
      { name: "App.tsx", type: "file" },
      {
        name: "components",
        type: "folder",
        children: [
          { name: "Button.tsx", type: "file" },
          { name: "Modal.tsx", type: "file" },
          {
            name: "common",
            type: "folder",
            children: [
              { name: "Header.tsx", type: "file" },
              { name: "Footer.tsx", type: "file" },
              { name: "Navigation.tsx", type: "file" },
            ],
          },
          {
            name: "forms",
            type: "folder",
            children: [
              { name: "LoginForm.tsx", type: "file" },
              { name: "RegisterForm.tsx", type: "file" },
              { name: "FormField.tsx", type: "file" },
            ],
          },
        ],
      },
      {
        name: "hooks",
        type: "folder",
        children: [
          { name: "useAuth.ts", type: "file" },
          { name: "useApi.ts", type: "file" },
          { name: "useLocalStorage.ts", type: "file" },
          { name: "useDebounce.ts", type: "file" },
        ],
      },
      {
        name: "utils",
        type: "folder",
        children: [
          { name: "helpers.ts", type: "file" },
          { name: "constants.ts", type: "file" },
          { name: "validators.ts", type: "file" },
          { name: "api.ts", type: "file" },
        ],
      },
      {
        name: "services",
        type: "folder",
        children: [
          { name: "authService.ts", type: "file" },
          { name: "apiService.ts", type: "file" },
          { name: "storageService.ts", type: "file" },
        ],
      },
      {
        name: "pages",
        type: "folder",
        children: [
          { name: "Dashboard.tsx", type: "file" },
          { name: "Profile.tsx", type: "file" },
          { name: "Settings.tsx", type: "file" },
        ],
      },
    ],
  },
  {
    name: "public",
    type: "folder",
    children: [
      { name: "index.html", type: "file" },
      { name: "favicon.ico", type: "file" },
      {
        name: "assets",
        type: "folder",
        children: [
          { name: "logo.svg", type: "file" },
          { name: "banner.png", type: "file" },
        ],
      },
    ],
  },
  {
    name: "tests",
    type: "folder",
    children: [
      { name: "setup.ts", type: "file" },
      {
        name: "unit",
        type: "folder",
        children: [
          { name: "helpers.test.ts", type: "file" },
          { name: "validators.test.ts", type: "file" },
        ],
      },
      {
        name: "integration",
        type: "folder",
        children: [
          { name: "auth.test.ts", type: "file" },
          { name: "api.test.ts", type: "file" },
        ],
      },
    ],
  },
];

export default function FileExplorerProject() {
  const renderFileStructure = useRenderFileStructure();

  return (
    <div className="flex h-full flex-col gap-0.5 pb-30 pl-3.5">
      {renderFileStructure(files)}
    </div>
  );
}

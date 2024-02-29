import { useTheme } from "@/context/ThemeProvider";
import { Editor, IAllProps } from "@tinymce/tinymce-react";

interface Props extends IAllProps {}

export function TextEditor({ onInit, onBlur, onEditorChange }: Props) {
  const { mode } = useTheme();
  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
      onInit={onInit}
      onBlur={onBlur}
      onEditorChange={onEditorChange}
      init={{
        height: 350,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "codesample",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
        ],
        toolbar:
          "undo redo | " +
          "codesample | bold italic forecolor | alignleft aligncenter |" +
          "alignright alignjustify | bullist numlist",
        content_style: "body { font-family:Inter; font-size:16px }",
        skin: mode === "dark" ? "oxide-dark" : "oxide",
        content_css: mode === "dark" ? "dark" : "light",
      }}
    />
  );
}

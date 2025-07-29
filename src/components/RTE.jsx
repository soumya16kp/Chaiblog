import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import React from "react";
import "./RTE.css"; // Import CSS

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="rte-container">
      {label && <label className="rte-label">{label}</label>}
      {control && (
        <Controller
          name={name || "content"}
          control={control}
          render={({ field: { onChange } }) => (
            <Editor
              apiKey="b3kq0qvcj6wc7adxt55xf353y4qfsulydk66xpvr645mfc5m"
              initialValue={defaultValue || ""}
              init={{
                height: 600, // Adjust height if needed
                width: "100%", // Make it responsive
                menubar: true,
                branding: false,
                plugins: [
                  "advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor",
                  "searchreplace", "visualblocks", "code", "fullscreen",
                  "insertdatetime", "media", "table", "help", "wordcount",
                  "emoticons", "codesample", "autoresize", "directionality"
                ],
                toolbar:
                  "undo redo | formatselect | bold italic underline strikethrough | " +
                  "alignleft aligncenter alignright alignjustify | " +
                  "bullist numlist outdent indent | " +
                  "forecolor backcolor removeformat | " +
                  "image media link codesample emoticons | " +
                  "preview fullscreen | toc hr | " +
                  "ltr rtl",
                content_style: "body { font-family: Arial, Helvetica, sans-serif; font-size: 18px; padding: 20px; }",
                autoresize_bottom_margin: 50,
                directionality: "ltr",
              }}
              onEditorChange={(content) => {
                if (onChange) {
                  onChange(content);
                }
              }}
            />
          )}
        />
      )}
    </div>
  );
}

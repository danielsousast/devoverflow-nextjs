import React from "react";

import Image from "next/image";
import { Control, FieldValues } from "react-hook-form";
import { Badge } from "../../ui/badge";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";

interface Props {
  control: Control<FieldValues>;
  handleInputKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => void;
  handleTagRemove: (tag: string, field: any) => void;
}

export function TagFormField({
  control,
  handleInputKeyDown,
  handleTagRemove,
}: Props) {
  return (
    <FormField
      control={control}
      name="tags"
      render={({ field }) => (
        <FormItem className="flex w-full flex-col">
          <FormLabel className="paragraph-semibold text-dark400_light800">
            Tags <span className="text-primary-500">*</span>
          </FormLabel>
          <FormControl className="mt-3.5">
            <>
              <Input
                className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                placeholder="Add tags..."
                onKeyDown={(e) => handleInputKeyDown(e, field)}
              />

              {field.value.length > 0 && (
                <div className="flex-start mt-2.5 gap-2.5">
                  {field.value.map((tag: any) => (
                    <Badge
                      key={tag}
                      className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize"
                      onClick={() => handleTagRemove(tag, field)}
                    >
                      {tag}
                      <Image
                        src="/assets/icons/close.svg"
                        alt="Close icon"
                        width={12}
                        height={12}
                        className="cursor-pointer object-contain invert-0 dark:invert"
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </>
          </FormControl>
          <FormDescription className="body-regular mt-2.5 text-light-500">
            Add up to 3 tags to describe what your question is about. You need
            to press enter to add a tag.
          </FormDescription>
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  );
}

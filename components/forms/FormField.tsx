// import { Container } from './styles';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface Props {
  form: any;
  title: string;
  name: string;
  description: string;
  children?: React.ReactNode;
}

export function BasicFormField({
  form,
  title,
  name,
  description,
  children,
}: Props) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex w-full flex-col">
          <FormLabel className="paragraph-semibold text-dark400_light800">
            {title} <span className="text-primary-500">*</span>
          </FormLabel>
          <FormControl className="mt-3.5">
            {children ? (
              children
            ) : (
              <Input
                className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                {...field}
              />
            )}
          </FormControl>
          <FormDescription className="body-regular mt-2.5 text-light-500">
            {description}
          </FormDescription>
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  );
}

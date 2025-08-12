import { useForm } from "@inertiajs/react";

// Generic, reusable wrapper around Inertia's useForm with helpful handlers
// Works with any form shape via generics
export type SubmitMethod = "post" | "put" | "patch" | "delete" | "get";

export type SubmitOptions = Parameters<ReturnType<typeof useForm>["post"]>[1];

export interface UseAppFormReturn<T> {
  data: T;
  setData: <K extends keyof T>(key: K, value: T[K]) => void;
  errors: Record<string, string>;
  processing: boolean;
  progress: ReturnType<typeof useForm>["progress"];
  isDirty: boolean;
  reset: ReturnType<typeof useForm>["reset"];
  clearErrors: ReturnType<typeof useForm>["clearErrors"];
  setError: ReturnType<typeof useForm>["setError"];
  setDefaults: ReturnType<typeof useForm>["setDefaults"];
  transform: ReturnType<typeof useForm>["transform"];
  // direct submitters
  submit: (method: SubmitMethod, url: string, options?: SubmitOptions) => void;
  post: ReturnType<typeof useForm>["post"];
  put: ReturnType<typeof useForm>["put"];
  patch: ReturnType<typeof useForm>["patch"];
  delete: ReturnType<typeof useForm>["delete"];
  get: ReturnType<typeof useForm>["get"];
  // handlers
  handleChange: (field: keyof T) => (e: any) => void;
  handleValue: <K extends keyof T>(field: K, value: T[K]) => void;
  handleCheckbox: (field: keyof T) => (e: any) => void;
  handleFile: (field: keyof T) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFiles: (field: keyof T, merge?: boolean) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (
    method: SubmitMethod,
    url: string,
    options?: SubmitOptions,
  ) => (e: React.FormEvent<HTMLFormElement> | Event) => void;
}

export function useAppForm<T extends Record<string, any>>(initialValues: T): UseAppFormReturn<T> {
  const form = useForm<T>(initialValues);

  const submit: UseAppFormReturn<T>["submit"] = (method, url, options) => {
    switch (method) {
      case "post":
        form.post(url, options);
        break;
      case "put":
        form.put(url, options);
        break;
      case "patch":
        form.patch(url, options);
        break;
      case "delete":
        form.delete(url, options);
        break;
      case "get":
        form.get(url, options);
        break;
      default:
        form.post(url, options);
    }
  };

  const handleSubmit: UseAppFormReturn<T>["handleSubmit"] = (method, url, options) => (e) => {
    e.preventDefault();
    submit(method, url, options);
  };

  const handleChange = (field: keyof T) => (e: any) => {
    const target = e?.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | undefined;
    let value: any;

    if (target) {
      if (target.type === "checkbox") value = (target as HTMLInputElement).checked;
      else if (target.type === "file") value = (target as HTMLInputElement).files?.[0] ?? null;
      else value = target.value;
    } else {
      // if direct value is passed instead of event
      value = e;
    }

    form.setData(field as any, value);
    if (form.errors[field as string]) form.clearErrors(field as string);
  };

  const handleValue = <K extends keyof T>(field: K, value: T[K]) => {
    form.setData(field, value);
    if (form.errors[field as string]) form.clearErrors(field as string);
  };

  const handleCheckbox = (field: keyof T) => (e: any) => {
    const checked = !!e?.target?.checked;
    form.setData(field as any, checked as any);
    if (form.errors[field as string]) form.clearErrors(field as string);
  };

  const handleFile = (field: keyof T) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    form.setData(field as any, file as any);
    if (form.errors[field as string]) form.clearErrors(field as string);
  };

  const handleFiles = (field: keyof T, merge: boolean = true) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (!merge) {
      form.setData(field as any, files as any);
    } else {
      const existing = (form.data as any)[field] ?? [];
      const combined = [...existing, ...files];
      form.setData(field as any, combined as any);
    }
    if (form.errors[field as string]) form.clearErrors(field as string);
  };

  return {
    data: form.data,
    setData: form.setData as any,
    errors: form.errors,
    processing: form.processing,
    progress: form.progress,
    isDirty: form.isDirty,
    reset: form.reset,
    clearErrors: form.clearErrors,
    setError: form.setError,
    setDefaults: form.setDefaults,
    transform: form.transform,
    submit,
    post: form.post,
    put: form.put,
    patch: form.patch,
    delete: form.delete,
    get: form.get,
    handleChange,
    handleValue,
    handleCheckbox,
    handleFile,
    handleFiles,
    handleSubmit,
  };
}

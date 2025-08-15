import { usePage } from "@inertiajs/react";

type ResponseProps = {
  response: any;
}

function useFormAdditionalResponse() {
    const {response} = usePage().props as unknown as ResponseProps;
    return response;
}

export default useFormAdditionalResponse;

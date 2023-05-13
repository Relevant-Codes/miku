import { Form, useLoaderData, redirect } from "react-router-dom";

import { updateOffer  } from "../offers";

export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateOffer(params.offerId, updates);
    return redirect(`/offers/${params.offerId}`);
  }

export default function EditOffer() {
  const { offer } = useLoaderData();

  return (
    <Form method="post" id="offer-form">
      <p>
        <span>Title</span>
        <input
          placeholder="Title"
          aria-label="Title"
          type="text"
          name="title"
          defaultValue={offer.title}
        />
        <input
          placeholder="Description"
          aria-label="Description"
          type="text"
          name="description"
          defaultValue={offer.description}
        />
      </p>
      
      <p>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  );
}
import { Form, useLoaderData } from "react-router-dom";
import { getOffer } from "../offers";

export async function loader({ params }) {
  const offer = await getOffer(params.offerId);
  return { offer };
}

export default function Offer() {
  const { offer } = useLoaderData();

  return (
    <div id="offer">
      <div>
        <h1>
          {offer.title ? (
            <>
              {offer.title}
            </>
          ) : (
            <i>No Title</i>
          )}{" "}
        </h1>
        <h2>
          {offer.description}
        </h2>

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
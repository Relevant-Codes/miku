import {
    Outlet,
    Link,
    useLoaderData,
    Form,
  } from "react-router-dom";

  import { getOffers, createOffer } from "../offers";
  
export async function action() {
    const offer = await createOffer();
    return { offer };
  }

export async function loader() {
    const offers = await getOffers();
    return { offers };
  }

export default function Root() {
    const { offers } = useLoaderData();
    return (
      <>
        <div id="sidebar">
          <h1>React Router offers</h1>
          <div>
            <form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search offers"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={true}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </form>
            <Form method="post">
                <button type="submit">New</button>
            </Form>

          </div>
          <nav>
          {offers.length ? (
            <ul>
              {offers.map((offer) => (
                <li key={offer.id}>
                  <Link to={`offers/${offer.id}`}>
                    {offer.title ? (
                      <>
                        {offer.title}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No offers</i>
            </p>
          )}
        </nav>
        </div>
        <div id="detail">
            <Outlet/>
        </div>
      </>
    );
  }
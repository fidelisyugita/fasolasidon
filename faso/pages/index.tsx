import React, { useState } from "react";
import Layout from "components/Layout";
import useUser from "lib/useUser";
import Form from "components/Form";
import fetchJson, { FetchError } from "lib/fetchJson";

// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts
export default function Home() {
  const { user } = useUser({
    redirectTo: "/login",
  });

  const [errorMsg, setErrorMsg] = useState("");

  return (
    <Layout>
      <div className="login">
        <Form
          errorMessage={errorMsg}
          onSubmit={async function handleSubmit(event) {
            event.preventDefault();

            setErrorMsg("");

            const body = {
              email: event.currentTarget.email.value,
              password: event.currentTarget.password.value,
            };
          }}
        />
      </div>
    </Layout>
  );
}

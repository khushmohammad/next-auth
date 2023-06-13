import { useSession, signIn, signOut } from "next-auth/react";
import useTranslation from "../hook/useTranslation";

export default function Logout() {
  const { t } = useTranslation();
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="align-items-center d-flex flex-column justify-content-center">
        <span className="mb-4">
          {t.sign_in_as} {session.user.email}
        </span>

        <button
          className="btn btn-danger w-25 text-capitalize"
          onClick={() => signOut()}
        >
          {t.logout}
        </button>
      </div>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

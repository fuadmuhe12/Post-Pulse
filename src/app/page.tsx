import { Button } from "@/components/ui/button";
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { get } from "http";

export default async function Home() {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();
  return (
    <div className="flex justify-center items-center min-h-screen gap-10">

      {
        !user ? <div className="flex flex-col gap-5">
          <LoginLink><Button>Sign in</Button></LoginLink>
          <RegisterLink><Button>Sign up</Button></RegisterLink>
        </div> :
          <div className=" flex gap-10 flex-col"><LogoutLink><Button>Sign out</Button></LogoutLink>
            <div >
              <h2>{user.email}</h2>
              <h2>{user.given_name}</h2>
            </div>
          </div>
      }
    </div>
  );
}

import NotificationForm from "./components/notificationForm";

export default function Home() {

  return (
    <>
      <h3>Login with <a href="/api/auth/signin">Google</a></h3>
      <NotificationForm />
    </>

  );
}
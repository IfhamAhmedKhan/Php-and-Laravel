import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="my-form">
        <fieldset>
          <legend>Welcome</legend>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: 'black', marginBottom: '20px' }}>Ifterious Web</h2>
            <Link href="/.root/login" style={{ textDecoration: 'none' }}>
              <button style={{ marginBottom: '15px' }}>Login</button>
            </Link>
            <br />
            <Link href="/.root/signup" style={{ textDecoration: 'none' }}>
              <button>Sign Up</button>
            </Link>
          </div>
        </fieldset>
      </div>
    </>
  );
}

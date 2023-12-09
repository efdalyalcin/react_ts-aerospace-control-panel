import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorPage.scss';

export default function ErrorPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="ErrorPage">
      <h1>Page Not Found</h1>
      <p>Redirecting to the home page...</p>
    </div>
  );
}

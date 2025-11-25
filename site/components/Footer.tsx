export default function Footer() {
  return (
    <footer className="bg-text-heading text-bg py-12">
      <div className="container-custom text-center">
        <p className="mb-3 text-lg">
          &copy; {new Date().getFullYear()} Virelia Ticaret Limited Şirketi.
          All rights reserved.
        </p>
        <p className="text-sm text-text-muted">
          Premium Mediterranean Food Products | B2B Export Solutions
        </p>
      </div>
    </footer>
  );
}

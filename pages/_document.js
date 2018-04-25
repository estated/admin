import Document, { Head, Main, NextScript } from 'next/document'
import ApiConnector from "../components/api/connector";

class AdminDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps }
  }

  render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css" />
          <link rel="stylesheet" href="https://unpkg.com/react-table@latest/react-table.css" />
        </Head>
        <Main />
        <NextScript />
      </html>
    )
  }
}

export default AdminDocument
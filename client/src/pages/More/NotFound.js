import styles from '../../styles/dashboard.module.css';
import { Helmet } from 'react-helmet';

export default function NotFound() {

    return (


        <body>
            <section className="md:p-10">
                <div className="container mx-auto h-screen">
                    <p className="text-xl mb-8"> Not Found.</p>
                </div>
            </section>
        </body>

    );
}

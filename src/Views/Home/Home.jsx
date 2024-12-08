/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import "./Home.css"

export function Home() {
    return (
        <main>
            <Nav />

            <Main />
        </main>
    )
}
function Nav() {
    return (
        <nav>
            <img className="logo_main" src="https://angelcstd.github.io/Evento/imagenes/Logo%20alondra.svg" alt="" />
        </nav>
    )
}

function Main() {
    return (
        <section className="main">
            <Reveal>
                <section className="container">
                    <div>
                        <p>Completa este formulario y estaras participando en la rifa de Alondra 2024</p>
                    </div>
                    <Form />
                </section>
            </Reveal>
            <hr />
            <Reveal>
                <section className="container">
                    <div>
                        <p>Hola, si quieres puedes usar el siguiente formulario para buscar el id de tu reservación en caso de que necesites mayor información</p>
                    </div>
                    <BuscarId />
                </section>
            </Reveal>
        </section>
    )
}

const Form = () => {
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        correo: '',
        telefono: '',
        codigo_postal: '',
        ciudad: '',
        folio: '',
        sucursal: '',
        terminos: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit}>

            <div>
                <label>
                    Nombres:
                    <input
                        placeholder="Ingresa tu nombre:"
                        required="true"
                        type="text"
                        name="nombres"
                        value={formData.nombres}
                        onChange={handleChange}
                    />
                </label>
            </div>

            <div>
                <label>
                    Apellidos:
                    <input
                        placeholder="Ingresa tus apellidos:"
                        required="true"
                        type="text"
                        name="apellidos"
                        value={formData.apellidos}
                        onChange={handleChange}
                    />
                </label>
            </div>

            <div>
                <label>
                    Folio de tu ticket:
                    <input
                        placeholder="Ingresa el número de folio de tu ticket:"
                        required="true"
                        type="number"
                        name="folio"
                        value={formData.folio}
                        onChange={handleChange}
                    />
                </label>
            </div>

            <div>
                <label>
                    Correo Electrónico:
                    <input
                        placeholder="Ingresa tu correo:"
                        required="true"
                        type="email"
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                    />
                </label>
            </div>

            <div>
                <label>
                    Telefono:
                    <input
                        placeholder="Ingresa tu número de télefono:"
                        required="true"
                        type="number"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                    />
                </label>
            </div>

            <div>
                <label>
                    Codigo postal:
                    <input
                        placeholder="Ingresa tu código postal:"
                        required="true"
                        type="number"
                        name="codigo_postal"
                        value={formData.codigo_postal}
                        onChange={handleChange}
                    />
                </label>
            </div>

            <div>
                <label>
                    Ciudad:
                    <input
                        placeholder="Ingresa tu ciudad:"
                        required="true"
                        type="text"
                        name="ciudad"
                        value={formData.ciudad}
                        onChange={handleChange}
                    />
                </label>
            </div>

            <div>
                <label>
                    Sucursal en la que compraste:
                    <select name="sucursal" id="">
                        <option value="">Selecciona una opción</option>
                        <option value="Aragon">Aragón</option>
                        <option value="Pena">Peña</option>
                        <option value="Izazaga">Izazaga</option>
                    </select>
                </label>
            </div>

            <div className="terminos">
                <label>
                    Acepto participar para la rifa de Alondra 2024
                    <input
                        required="true"
                        type="checkbox"
                        name="terminos"
                        checked={formData.terminos}
                        onChange={handleChange}
                    />
                </label>
            </div>

            <button type="submit">Enviar</button>
        </form>
    );
};

const BuscarId = () => {
    const [folio, setfolio] = useState("")

    const handleChange = (e) => {
        setfolio(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({ folio })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Folio:
                <input
                    placeholder="Ingresa tu número de folio:"
                    required="true"
                    type="number"
                    name="folio"
                    value={folio}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Enviar</button>
        </form>
    )
}

import { motion, useAnimation, useInView } from "framer-motion";

const Reveal = ({ children }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const mainControls = useAnimation()

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible")
            console.log(mainControls)
        } else {
            mainControls.set("hidden")
        }
    }, [isInView])

    return (
        <div ref={ref} style={{ position: "relative", width: "100%" }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.5, delay: 0.25 }}
            >
                {children}
            </motion.div>
        </div>
    )
}
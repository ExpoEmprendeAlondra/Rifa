/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
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
                        <p>Usa este formulario para buscar tu folio y revisar si ya esta registrado</p>
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = uuidv4();
        const data = { ...formData, id };
        console.log(data)
        await fetch("https://backexp.vercel.app/db", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then((res) => {
                console.log(res)
                if (!res.error) {
                    alert(res.message + " Tu folio es: " + res.folio)
                    setFormData(prev => {
                        return {
                            ...prev,
                            folio: '',
                            sucursal: '',
                            terminos: false,
                        }
                    })
                } else {
                    alert(res.message)
                }
            })
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
                    <select name="sucursal" id="" onChange={handleChange} value={formData.sucursal}>
                        <option value="">Selecciona una opción</option>
                        <option value="Aragon">Aragón</option>
                        <option value="Pena Pena">Peña</option>
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch(`https://backexp.vercel.app/db?id_folio=${folio}`)
            .then(res => res.json())
            .then((res) => {
                console.log(res)
                if (!res.error) {
                    alert(res.message + " Para el folio " + res.data[0].folio)
                } else {
                    alert(res.message)
                }
            })
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
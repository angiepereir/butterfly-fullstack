import NavBar from "../components/NavBar"
import {render, screen} from "@testing-library/react"
import { expect,test, beforeEach} from "vitest"
import {MemoryRouter} from "react-router-dom"

beforeEach(() => {
    render(
			<MemoryRouter>
				<NavBar/>
			</MemoryRouter>
		);
})
test ('renders Navbar with title', () => {
    const showTitle = screen.getByText(/Asian Butterflies/i)
    expect (showTitle).toBeDefined()
})

test ('renders link Inicio', () => {
    const linkInicio = screen.getByRole("link", {
        name:/Inicio/i
    })
    expect(linkInicio).toBeDefined()
})

test ('renders link Galería', () => {
    const linkGaleria = screen.getByRole("link", {
        name:/Galería/i
    })
    expect(linkGaleria).toBeDefined()
})
test ('renders link Crear nueva', () => {
    const linkCrearNueva = screen.getByRole("link", {
        name:/Crear nueva/i
    })
    expect(linkCrearNueva).toBeDefined()
})
test ('renders link contacto', () => {
    const linkContacto= screen.getByRole("link", {
        name:/Contacto/i
    })
    expect(linkContacto).toBeDefined()
})

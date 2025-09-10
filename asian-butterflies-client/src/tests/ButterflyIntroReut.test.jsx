import ButterflyIntroReut from "../components/ButterflyIntroReut"
import {render, screen} from "@testing-library/react"
import { expect,test } from "vitest"


test('Render the title in the Butterfly component', () => {
    render(<ButterflyIntroReut title="Descubre las Mariposas Asiaticas"/>)
    const titleElement = screen.getByText(/Descubre las Mariposas Asiaticas/i)
    expect(titleElement).toBeDefined()
})
 

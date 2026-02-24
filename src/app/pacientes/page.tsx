import React from "react";
import PacientesClient from "./PacientesClient";
import { getPatients } from "./actions";

export default async function PacientesPage() {
    const initialPatients = await getPatients();

    return <PacientesClient initialPatients={initialPatients} />;
}

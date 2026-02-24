import React from "react";
import { getPatient } from "../actions";
import PatientProfileClient from "./PatientProfileClient";
import { notFound } from "next/navigation";

interface PatientPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function PatientPage({ params }: PatientPageProps) {
    const { id } = await params;

    const patient = await getPatient(id);

    if (!patient) {
        notFound();
    }

    return <PatientProfileClient patient={patient} />;
}

import { useEffect, useState } from "react";
import type { Target } from "../types";
import { api } from "../services/api";
import TargetList from "../components/targets/TargetList";

export default function Dashboard() {
    const [targets, setTargets] = useState<Target[]>([]);


    useEffect(() => {
        api.get<Target[]>('/targets')
            .then((data: Target[]) => setTargets(data))
            .catch((error: any) => console.error('Error fetching targets:', error));
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <TargetList targets={targets} />

        </div>
    );
}
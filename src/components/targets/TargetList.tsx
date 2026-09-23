import type { Target } from "../../types";

interface TargetListProps {
    targets: Target[]
}

export default function TargetList({ targets }: TargetListProps) {
    return (
        <ul>
            {targets.map((t) => (
                <li key={t.id}>{t.name}</li>
            ))}
        </ul>
    )
}
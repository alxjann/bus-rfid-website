import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UsersIcon } from "lucide-react";

function CreateCard({ title, count, lastUpdate }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <UsersIcon className="h-4 w-4 text-muted-foreground" />
          <div className="text-2xl font-semibold">{count}</div>
        </div>
        <div className="text-sm text-muted-foreground mt-2">{lastUpdate}</div>
      </CardContent>
    </Card>
  );
}

export default CreateCard;

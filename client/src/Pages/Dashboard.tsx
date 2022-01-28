import React, { ReactElement } from "react";
import Container from "../Components/Native/Container";
import List from "../Components/Native/List";
import DashboardCard from "../Components/Self/DashboardCard";

export default function Dashboard(): ReactElement {
  return (
    <Container>
      <div className="grid md:grid-cols-2 gap-5 2xl:gap-8">
        <DashboardCard
          footer="Alle Emails"
          heading="Ungelesene E-Mails"
          to="/mails"
          notifications="2"
          className="row-span-2"
        >
          <List>
            <List.Item
              heading="Artikel Braunschweiger Zeitung (laurenz.rausche@gmail.com)"
              text="Hallo David, im anhang schicke ich dir noch einmal den Artikel für die BS Zeitung, schau bitte noch einmal drüber und schick ihn dann an Frau Pöhl-Weber. Mit freundlichen Grüßen Laurenz"
            />
            <List.Item
              heading="Mitarbeiter des Monats (jan.hoeschel@interseroh.com)"
              text="Liebe mk:return Mitarbeiter, ihr habt echt fleißig gearbeit, dafür wollen wir euch noch einmal 12x 200 Euro für den MDM zur verfügung stellen. Grüße Jan"
            />
          </List>
        </DashboardCard>
        <div className="grid grid-cols-2 gap-3 2xl:gap-5">
          <DashboardCard
            footer="Details"
            heading="Provision"
            to="/provision"
            size="sm"
          />
          <DashboardCard
            footer="Alle Geburtage"
            heading="Geburtstage"
            to="/calendar"
            size="sm"
          />
        </div>
        <DashboardCard
          footer="Zum Kalender"
          heading="Kalendar"
          to="/calendar"
          size="sm"
          className="row-span-2"
        />
        <DashboardCard
          footer="Aufgaben"
          heading="Alle Aufgaben"
          to="/tasks"
          notifications="44"
          className="row-span-2"
        />
        <DashboardCard
          footer="Alle Dokumente"
          heading="Protokolle"
          to="/documents"
          size="sm"
        />
      </div>
    </Container>
  );
}

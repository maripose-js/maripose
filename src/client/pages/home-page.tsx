import { Button, Text, Title } from "@mantine/core";
import type { PageData } from "../app.tsx";
import { siteData } from "virtual-site-data";
import { Link } from "react-router-dom";
import { useIcon } from "../lib/useIcon.tsx";
import type { HomeButton } from "../../utils/config.ts";
import { BentoGrid, BentoGridItem } from "#/bento-grid.tsx";

export const HomePage = ({ data }: { data: PageData }) => {
  return (
    <div className="mp-home-wrapper">
      <div className="mx-auto max-w-2xl pt-32 sm:pt-48 pb-10 sm:pb-20 lg:pt-56">
        <div className="mp-home-col">
          <Title size={"h1"} className={"mp-home-title mp-text-shadow"}>
            {siteData.title}
          </Title>
          <Title size={"h2"} className={"!text-4xl"}>
            {siteData.slogan}
          </Title>
          <Text>{siteData.description}</Text>
          <div className="mp-home-buttons">
            {siteData.buttons.map((button: HomeButton, index: number) => (
              <Link to={button.link} target={button.target} key={index}>
                <Button
                  key={button.text}
                  variant={button.variant}
                  leftSection={useIcon(button.icon)}
                >
                  {button.text}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {data.meta?.features.length! > 0 ? (
        <BentoGrid>
          {data.meta?.features.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              className={item.className}
              icon={item.icon}
            />
          ))}
        </BentoGrid>
      ) : null}
    </div>
  );
};

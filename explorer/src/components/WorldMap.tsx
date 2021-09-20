import React from 'react';
import { scaleLinear } from 'd3-scale';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import ReactTooltip from 'react-tooltip';
import { Box } from '@mui/material';
import { ExplorerContext } from '../context/main';
import { countriesData } from '../data/countriesData';
import { ContentCard } from './ContentCard';

const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

export const WorldMap: React.FC = () => {
  const [tooltipContent, setTooltipContent] = React.useState<string>('');
  const [data, setData] = React.useState<Record<string, unknown>[]>([]);
  const { mode }: any = React.useContext(ExplorerContext);
  React.useEffect(() => {
    setData(countriesData);
  }, []);

  const colorScale: any = scaleLinear()
    .domain([0, 1200])
    // @ts-ignore
    .range(mode === 'dark' ? ['#ffedea', '#ff5233'] : ['orange', 'red']);

  return (
    <ContentCard title="Distribution of nodes around the world">
      <Box>
        <ComposableMap
          data-tip=""
          style={{
            backgroundColor:
              mode === 'dark'
                ? 'rgba(50, 60, 81, 1)'
                : 'rgba(241, 234, 234, 1)',
          }}
          projectionConfig={{
            rotate: [-10, 0, 0],
            scale: 187,
          }}
        >
          {data.length > 0 && (
            <Geographies geography={geoUrl}>
              {({ geographies }: any) =>
                geographies.map((geo: any) => {
                  const d = data.find((s) => s.ISO3 === geo.properties.ISO_A3);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      // @ts-ignore
                      fill={d ? colorScale(d.nodes) : '#F5F4F6'}
                      onMouseEnter={() => {
                        const { NAME_LONG } = geo.properties;
                        setTooltipContent(
                          // @ts-ignore
                          `${NAME_LONG} | ${d?.nodes || 0}`,
                        );
                      }}
                      onMouseLeave={() => {
                        setTooltipContent('');
                      }}
                      style={{
                        hover: {
                          fill: 'black',
                          outline: 'white',
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          )}
        </ComposableMap>
        <ReactTooltip>{tooltipContent}</ReactTooltip>
      </Box>
    </ContentCard>
  );
};
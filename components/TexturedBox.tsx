import { useTexture, Text, Box  } from '@react-three/drei'
import { WordAndImageData } from '../components/data'

import { useState } from 'react'; 
import { Fragment } from 'react';

import 
{
BoxStyle,
useBorderSizes
}
from '../components/BoxStyle'

// import borderSizesFocus from '../components/BoxStyle';

import CategoryTitle from './CategoryTitle';

import { A11y } from '@react-three/a11y'


export default function TexturedBox({ onClick }: { onClick: (item: typeof WordAndImageData[0]) => void }) {
  // Keep a counter per category so we can reset the index for each group
  const categoryCounts: Record<string, number> = {};

  let startingCategoryPosition = 0;

  return (
    <>
     {WordAndImageData.map((item, index) => {
        // increment and read the per-category index
        
        const cat = item.category ?? 'default';
        if (!categoryCounts[cat]) categoryCounts[cat] = 0;
        let perCategoryIndex = categoryCounts[cat]++;

        let positionX = 0;
        let rotationY = 0;
        let positionZ = 0;

        let boxPositionY = 0;
        let triangleWidth = 0;
        let boxGeometryArgs: [number, number, number] = [0, 0, 0];
        let textPosition: [number, number, number] = [0, 0, 0];

        let focused = false;

        switch(item.category) {
          case 'Websites':
            positionX = -2.8;
            rotationY = 2;
            startingCategoryPosition = -.25;
            perCategoryIndex += startingCategoryPosition;
            positionZ = perCategoryIndex * 2.75;
            break;
          // case 'Print Design':
          //   positionX = 2.65;
          //   rotationY = -2;
          //   startingCategoryPosition = -1.25;
          //   perCategoryIndex += startingCategoryPosition;
          //   positionZ = perCategoryIndex * 2.5;
          //   break;
          case 'Motion Design':
            positionX = 2.65;
            rotationY = -2;
            positionZ = 18;
            break;
          case 'Interior Design':
            positionX = 2.65;
            rotationY = -2;
            positionZ = 21;
            break;
          case 'Email Design':
            positionX = 2.65;
            rotationY = -2;
            startingCategoryPosition = -.25;
            perCategoryIndex += startingCategoryPosition;
            positionZ = perCategoryIndex * 2.5;
            break;
          default:
            positionX = 2;
            rotationY = -2;
            positionZ = perCategoryIndex * 3;
        }

        if (item.category !== 'Email Design') {
          boxPositionY = 0;
          triangleWidth = 0.522;
          boxGeometryArgs = [0, 1, 1];
          textPosition = [0, .64, 0];
        }
        else {
          boxPositionY = 0;
          triangleWidth = 1.044; 
          boxGeometryArgs = [0, 1, 2];
          textPosition = [0, .64, 0];
        }

        const useBorderExportFunction = useBorderSizes();
        const borderBool = useBorderExportFunction.bool;
        const borderChildFunction = useBorderExportFunction.borderSizesFocus;
        
        return (
          <Fragment key={`${cat}-${perCategoryIndex}-${index}`}>
            {/* <A11y
              role="button"
              description={item.title}
              actionCall={() => {
                onClick(item);
              }}
            > */}
              <BoxStyle
                x={positionX}
                y={2.75}
                z={positionZ}
                rotationY={rotationY}
                image={item.imgMain}
                title={item.title}
                category={item.category}
                index={perCategoryIndex}
                onClick={() => onClick(item)}
                boxPositionY={boxPositionY}
                triangleWidth={triangleWidth}
                boxGeometryArgs={boxGeometryArgs}
                textPosition={textPosition}
                borderFocus={focused}
                focusFunction={borderChildFunction}
              />
            {/* </A11y> */}
          </Fragment>
        );
      })}

      {Object.keys(categoryCounts).map((category, idx) => {
        let titleX = 0;
        let titleY = 0;
        let titleRotationY = 0;
        let titleZ = 0;

        switch (category) {
          case 'Websites':
            titleX = -2.8;
            titleY = 4;
            titleRotationY = -1;
            titleZ = startingCategoryPosition;
            break;
          // case 'Print Design':
          //   titleX = 2;
          //   titleY = 3.65;
          //   titleRotationY = 1;
          //   titleZ = startingCategoryPosition;
          //   break;
          case 'Motion Design':
            titleX = 2;
            titleY = 4;
            titleRotationY = 1;
            titleZ = 18;
            break;
          case 'Interior Design':
            titleX = 2;
            titleY = 4;
            titleRotationY =1;
            titleZ = 21;
            break;
            case 'Email Design':
            titleX = 2;
            titleY = 4;
            titleRotationY = 1;
            titleZ = startingCategoryPosition;
            break;
          // case 'Email Design':
          //   titleX = 2;
          //   titleY = 4;
          //   titleRotationY = 1;
          //   titleZ = 25;
          //   break;
          default:
            titleX = 2;
            titleY = 4;
            titleRotationY = -2;
            titleZ = startingCategoryPosition;
        }

        return (
          <Fragment key={`${category}-${idx}`}>
            <CategoryTitle
              x={titleX}
              y={titleY}
              z={titleZ}
              rotationY={titleRotationY}
              title={category}
            />
          </Fragment>
        );
      })}

    </>
  )
}

// export default function TexturedBox({ onClick }: { onClick: (item: typeof WordAndImageData[0]) => void }) {
//   return (
//     <>
//       {WordAndImageData.map((item, index) => (
//         <>
//         <Text
//           position={[-2.75, 2.5, index * 3]} // Adjust position as needed
//           fontSize={.15}
//           color="white"
//           anchorX="center"
//           anchorY="middle"
//           rotation={[0, Math.PI / 2, 0]} // Rotate 90 degrees (PI/2 radians) around Z
//         >
//           {item.title}
//         </Text>
//         <mesh
//           key={index}
//           position={[-3, 1.5, index * 2.5]}
//           onClick={() => onClick(item)}
//         >
//           <boxGeometry args={[0, 1, 1]} />
//           <meshStandardMaterial map={useTexture(item.imgMain)} />
//         </mesh>
//         </>
//       ))}
//     </>
//   )
// }



// export default function TexturedBox({ onClick }: { onClick: (item: typeof WordAndImageData[0]) => void }) {
//   return (
//     <>
//       {WordAndImageData.map((item, index) => (
//         <mesh
//           key={index}
//           position={[-3, 1.5, index * 2.5]}
//           onClick={() => onClick(item)}
//         >
//           <boxGeometry args={[0, 1, 1]} />
//           <meshStandardMaterial map={useTexture(item.imgMain)} />
//         </mesh>
//       ))}
//     </>
//   )
// }



// export default function TexturedBox({ onClick }: { onClick: (item: typeof WordAndImageData[0]) => void }) {
//   return (
//     <>
//       {WordAndImageData.map((item, index) => (
//         <>
//         <Html
//         // occlude 
//       transform
//       distanceFactor={1.2}
//       center
//       rotation-y={90 * (Math.PI / 180)}
//       position-x={-3}
//       position-z={index * 2.5}
//       position-y={-0.1}
//       className={`w-48 rounded-md overflow-hidden`}
//       >
//       <div className="bg-white bg-opacity-50 backdrop-blur-lg text-xs p-2 w-full">
//         <h2 className="font-bold">{item.title}</h2>
//         <img src={item.imgMain} alt={item.title} className="w-full h-32 object-cover my-2"/>
//       </div>
//       <button
//         className={`hover:bg-opacity-50 transition-colors duration-500 px-4 py-2 font-bold text-white w-full text-xs`}
//       >
//         Add to cart
//       </button>
//     </Html>
//         </>
//       ))}
//     </>
//   )
// }
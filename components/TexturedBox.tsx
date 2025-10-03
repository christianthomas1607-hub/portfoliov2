import { useTexture, Text, Box  } from '@react-three/drei'
import { WordAndImageData } from '../components/data'

import BoxStyle from '../components/BoxStyle'

export default function TexturedBox({ onClick }: { onClick: (item: typeof WordAndImageData[0]) => void }) {
  // Keep a counter per category so we can reset the index for each group
  const categoryCounts: Record<string, number> = {};

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

        switch(item.category) {
          case 'Web Design':
            positionX = -3.25;
            rotationY = 2;
            positionZ = perCategoryIndex * 3;
            break;
          case 'Print Design':
            positionX = 2.75;
            rotationY = -2;
            perCategoryIndex += 2;
            positionZ = perCategoryIndex * 3;
            break;
          case 'Motion Design':
            positionX = 1;
            rotationY = 2;
            positionZ = perCategoryIndex * 4;
            break;
          default:
            positionX = 2;
            rotationY = -2;
            positionZ = perCategoryIndex * 3;
        }

        return (
          <BoxStyle
            key={`${cat}-${perCategoryIndex}-${index}`}
            x={positionX}
            y={2.75}
            z={positionZ}
            rotationY={rotationY}
            image={item.imgMain}
            title={item.title}
            index={perCategoryIndex}
            onClick={() => onClick(item)}
          />
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
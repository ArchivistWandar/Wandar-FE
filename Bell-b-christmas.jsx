/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 /Users/sojeong/Documents/Wandar-FE/assets/glbAsset/bell-b-christmas.glb 
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/bell-b-christmas.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.bell_b_christmas.geometry} material={materials.universal_a} />
    </group>
  )
}

useGLTF.preload('/bell-b-christmas.glb')

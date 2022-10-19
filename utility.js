import * as path from "https://deno.land/std@0.160.0/path/mod.ts";

// Parse JSON file and return an object
export function parseJSONFile( file ) {
  try {
    return JSON.parse( Deno.readTextFileSync( new URL( stringify( file ) ) ) );
  } catch( error ) {
    throw error;
  }
}

// Resolve the file to project directory and return the path
export function resolvePathToProject( file ) {
  return new URL( path.join( path.parse( Deno.mainModule ).dir , stringify( file ) ) );
}

// Force input type to be a string
export function stringify( input ) {
  return new String( input || "" ).toString();
}
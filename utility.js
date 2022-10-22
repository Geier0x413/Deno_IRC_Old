import { deepMerge } from "https://deno.land/std@0.160.0/collections/deep_merge.ts";

export function mergeObjects(...args) {
  return deepMerge(...args);
};

// Return an object of IRC numerical replies
export const numerical_replies = parseJSONFile( import.meta.resolve( "./assets/numerical_replies.json" ) );

// Parse JSON file and return an object
export function parseJSONFile( file ) {
  try {
    return JSON.parse( Deno.readTextFileSync( new URL( stringify( file ) ) ) );
  } catch( error ) {
    throw error;
  }
}

// Force input type to be a string
export function stringify( input ) {
  return new String( input || "" ).toString();
}

// Translate IRC replies
export function translateIRCReply( input ) {
  input = stringify( input ).toUpperCase();
  input = input.match( /\d{1,3}/g ) ? input.padStart( 3 , "0" ) : input;
  for ( let code in numerical_replies ) {
    let reply = stringify( numerical_replies[ code ] ).toUpperCase();
    if ( input == code ) {
      return reply;
    } else if ( input == reply ) {
      return code;
    }
  }
  return null;
}
import * as path from "https://deno.land/std@0.160.0/path/mod.ts";

// Return an object of IRC numerical replies
export const numerical_replies = parseJSONFile( resolvePathToProject( "/assets/numerical_replies.json" ) );

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
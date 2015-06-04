//
//  AddressBook.m
//
//  Created by mattotodd on 4/6/15.
//  Copyright (c) 2015 Facebook. All rights reserved.
//
@import AddressBook;
#import "AddressBook.h"

@implementation ContactsManager
RCT_EXPORT_MODULE();


-(void)requestAccessToContacts:(RCTResponseSenderBlock)callback {
  RCT_EXPORT();
  ABAddressBookRequestAccessWithCompletion(ABAddressBookCreateWithOptions(NULL, nil), ^(bool granted, CFErrorRef error) {
    if (!granted){
      callback(@[@"Access to contacts not granted"]);
    }
    
    callback(@[[NSNull null], @"Access to contacts granted"]);
  });
}

-(void)listAllContacts:(RCTResponseSenderBlock)callback {
  RCT_EXPORT();
  
  CFErrorRef *error = NULL;
  ABAddressBookRef addressBook = ABAddressBookCreateWithOptions(NULL, error);
  CFArrayRef allPeople = ABAddressBookCopyArrayOfAllPeople(addressBook);
  CFIndex numberOfPeople = ABAddressBookGetPersonCount(addressBook);
  
  NSMutableArray *allContacts =  [NSMutableArray new];
  
  for(int i = 0; i < numberOfPeople; i++) {
    
    ABRecordRef person = CFArrayGetValueAtIndex( allPeople, i );
    
    
    NSString *firstName = (__bridge NSString *)(ABRecordCopyValue(person, kABPersonFirstNameProperty));
    NSString *lastName = (__bridge NSString *)(ABRecordCopyValue(person, kABPersonLastNameProperty));
    
    BOOL hasName = false;
    
    NSMutableDictionary *personObj = [NSMutableDictionary new];
    
    if (firstName) {
      [personObj setObject: firstName forKey:@"firstName"];
      hasName = true;
    }
    
    if (lastName) {
      [personObj setObject: lastName forKey:@"lastName"];
      hasName = true;
    }
    
    if (hasName) {
      // Only add to address book if the person has a name and number
      
      ABMultiValueRef phoneNumbers = ABRecordCopyValue(person, kABPersonPhoneProperty);
      NSMutableArray *phoneNumberArray = [NSMutableArray new];
      
      for (CFIndex i = 0; i < ABMultiValueGetCount(phoneNumbers); i++) {
        NSString *phoneNumber = (__bridge_transfer NSString *) ABMultiValueCopyValueAtIndex(phoneNumbers, i);
        [phoneNumberArray addObject:phoneNumber];
      }
      
      if (phoneNumberArray.count > 0) {
        [personObj setObject: phoneNumberArray forKey:@"phoneNumbers"];
        
        
        if (hasName && ABPersonHasImageData(person)) {
          CFDataRef photoData = ABPersonCopyImageData(person);
          
          NSData* data = (__bridge NSData*)photoData;
          // write to temp directory and store URI in photos array
          // get the temp directory path
          
          // Write to docs directory
          NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
          NSString *docsPath = [paths objectAtIndex:0]; //Get the docs directory
          
          //NSString* docsPath = [NSTemporaryDirectory()stringByStandardizingPath];
          
          NSError* err = nil;
          NSString* filePath = [NSString stringWithFormat:@"%@/photo_XXXXX", docsPath];
          char template[filePath.length + 1];
          strcpy(template, [filePath cStringUsingEncoding:NSASCIIStringEncoding]);
          mkstemp(template);
          filePath = [[NSFileManager defaultManager]
                      stringWithFileSystemRepresentation:template
                      length:strlen(template)];
          
          // save file
          if ([data writeToFile:filePath options:NSAtomicWrite error:&err]) {
            [personObj setObject: filePath forKey:@"photoUrl"];
          }
          
          CFRelease(photoData);
        }
        
        
        [allContacts addObject:personObj];
      }
    }
  }
  
  callback(@[[NSNull null], allContacts]);
  
}

@end
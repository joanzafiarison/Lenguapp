import pandas as pnd 
import numpy as np 
import os

import xml.etree.cElementTree as et 

dirname = os.path.dirname(__file__)
filename = os.path.join(dirname, 'xml_extract.xml')

print("hello python I extract XML")

tree = et.parse(filename)
root= tree.getroot()
#ok root


#print(root)

QueryTranslation = [] 
TranslationStack = []
TranslationSet = []
Ids = []

#https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=science[journal]+AND+breast+cancer+AND+2008[pdat]

for id_list in root.iter('IdList'):
    # print (id_list)
    for id in id_list.iter('Id'):
        Ids.append(id.text)

#QueryTranslation
for query_translation in root.iter('QueryTranslation'):
    QueryTranslation.append(query_translation.text)

#TranslationSet>Translation>From+To

for translation_set in root.iter('TranslationSet'):
    for translation in translation_set :
        data = set([translation[0].text,translation[1].text])
        TranslationSet.append(data)

for translation_stack in root.iter('TranslationStack'):
    for stack in translation_stack : 
        #target TermSet Or Root
        if(stack.tag == "TermSet"):
            theme = stack[0].text 
            fields = stack[1].text
            count = stack[2].text
            explodes = stack[3].text

            terms = dict({"theme":theme,"fields":fields,"count":count,"explodes":explodes})
            #print("themes "+stack[0].text)
            #print("fields "+stack[1].text)
            #print("count "+stack[2].text)
            #print("explodes "+stack[3].text)
            TranslationStack.append(terms)

print(TranslationSet)
print(TranslationStack)

#TranslationStack>TermSet+OP>Term+Field+Count+Explode



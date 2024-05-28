import spacy
import sys
nlp = spacy.load("ja_core_news_sm")           # load package "en_core_web_sm"
#nlp = spacy.load("/path/to/en_core_web_sm")  # load package from a directory
#python -m spacy download ja_core_news_sm
#make env

str = "私は日本語少ししか話せません"
def getPos(str):
    print(str)
    doc = nlp(str)
    #print("text, label", [ [ent.text, ent.label ] for ent in doc.ents])
    #print("pos, head  text",[ [token.pos_, token , token.head.text] for token in doc])
    return [ [token.pos_, token , token.head.text] for token in doc ]

def test(str):
    print("hello")
    return str
if __name__ == "__main__":
    test(sys.argv[2])
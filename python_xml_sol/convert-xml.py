#!/usr/bin/python

import xml.etree.ElementTree as ET
import os

"""
    function that  parse the xml file
    if exception occur taking the line number where the action failed and send it to  new function remove junk
    pulling out the branch name and if action succeeded 
    delete the new file that was created before
 """
def xml_parser(file):
    try:
        tree = ET.parse(file)
        root = tree.getroot()
        branches = root.find("./scm/branches/hudson.plugins.git.BranchSpec/name").text
        result = root.find("./runPostStepsIfResult/name").text
        print("branch" + "= " + branches + "," + "result" + "=" +  result)
        os.remove(file)
    except Exception as e:
        line_num = e.__str__().split()[5]
        if ',' in line_num:
            line = line_num.replace(",", "")
            remove_junk(file, int(line))

""" 
receive the XML file and the line number 
reading the file writing to new file called new_build.xml  
all the lines that number is small from the number received in the exeption
sending back the the new file again the xml_parser
"""
def remove_junk(file,line):
    with open(file, "r") as f:
        lines = f.readlines()
        for num, l in enumerate(lines, 1):
            if num < line:
                with open("new_build.xml",'a') as f:
                    f.writelines(l)
        xml_parser("new_build.xml")

""" 
running top down on all dirs and files from current dir searching for build.xml
"""
def main():
    for root, dirs, files in os.walk("../..", topdown=True):
        for f in files:
            if "build.xml" in f:
                xml_parser(f)

if __name__ == '__main__':
    main()
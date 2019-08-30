Setting a shell variable
```
color='baby blue'
background=red
```

Using a variable within a string
```
echo Avatars are ${color} color
echo "Avatars are $color color"
```

Adding a default value if the variable is undefined
```
echo Josh looks ${adj:-seriously }horrible
# Josh looks seriously horrible
```

Assigning a new value to variable if variable is undefined
```
echo Josh! ${adj:=feaking }horrible
```
On the first run, $adj is undefined. On the second run, $adj is defined with "freaking "


Read assigns an individual word to a specified variable. 
The last variable will be assigned the remaining words when there are
more words than variables
```
read city state message
Clarke Quay says hello to you

# message='says hello to you'
```
You can escape the space so that the space isn't interpreted as separating variable values
```
Clarke\ Quay
```

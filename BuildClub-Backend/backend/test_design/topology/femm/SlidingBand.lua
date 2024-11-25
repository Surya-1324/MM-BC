path = "data/6719e3fee4a06f68d90b1170/car/car_Motor/Sliding_data.txt"
handle = openfile(path,"w")


for i = 1,1440,1
do
   angle = i* 360/1440
   a,b = mo_getgapb("slidingBand",angle)
   write(handle, angle .. "," .. a .. "," .. b .. "\n")
end


closefile(handle)